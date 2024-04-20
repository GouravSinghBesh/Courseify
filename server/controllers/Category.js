const Category = require("../models/Category");

exports.createCategory = async(req,res)=>{
    try {
       const {name,description} = req.body; 

       if(!name || !description){
        return res.status(400).json({
            success : false,
            message  :"all fields are required"
        })
       } 

       const newCategory = await Category.create({name , description});

       return res.status(200).json({
        success : true,
        message :"category created successfully"
       })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })
    }
}


exports.showAllCategory = async(req,res)=>{
    try {
        const allCategory = await Category.find({},{name : true,description : true});
        
        return res.status(200).json({
            success : true,
            message : "all categories fetched successfully",
            data  : allCategory
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })
    }
}

exports.categoryPageDetails = async(req,res)=>{
    try {
        const {category_id} = req.body;

        const selectedCategory = await Category.findOne({category_id}).populate("courses").exec();

        if(!selectedCategory){
            return res.status(400).json({
                success : false,
                message : "category not found"
            })
        }

        if(selectedCategory.lenght === 0){
            return res.status(400).json({
                success : false,
                message : "no course found with the selected category"
            })
        }

        selectedCourse = selectedCategory.courses;

        //get courses of other category
        const categoriesExceptSelected = await Category.find({
            _id  :{$ne : category_id}}).populate("courses").exec();
        let differentCourses = [];
        for(const category of categoriesExceptSelected){
            differentCourses.push(...category.courses)
        }

        //get top selling courses across all category
        const allCategories = await Category.find().populate("courses");
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses: mostSellingCourses,
		});
        

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })
    }
}