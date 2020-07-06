exports.createSeachableObject = (query) => {
    let searchableObject = {};
    if(query.name) {
        searchableObject["Name"] = {
            $regex: new RegExp (query.name.toString().toLowerCase()),
            $options: 'i'
        };
    }
    
    if(query.admno) {
        searchableObject["Admission No"] = {
            $regex: new RegExp (query["admno"].toString().toLowerCase()),
            $options: 'i'
        };
    }
    
    if(query.city) {
        searchableObject["City"] = {
            $regex: new RegExp (query.city.toString().toLowerCase()),
            $options: 'i'
        };
    }

    if(query.state) {
        searchableObject["State"] = {
            $regex: new RegExp (query.state.toString().toLowerCase()),
            $options: 'i'
        };
    }

    if (query.sex) {
        searchableObject.Sex = {
            $regex: new RegExp (query.sex.toString().toLowerCase()),
            $options: 'i'
        };
    }
    
    if (query.house) {
        searchableObject.House = {
            $regex: new RegExp (query.house.toString().toLowerCase()),
            $options: 'i'
        };
    }

    if(query.department) {
        searchableObject.Department = {
            $regex: new RegExp (query.department.toString().toLowerCase()),
            $options: 'i'
        };
    }

    if (query.club) {
        searchableObject.Clubs = {
            $regex: new RegExp (query.club.toString().toLowerCase()),
            $options: 'i'
        };
    }

    return searchableObject;
}

exports.skipAndLimit = function (skip, limit) {
    return {
        skip: parseInt(skip),
        limit: parseInt(limit)
    };
}