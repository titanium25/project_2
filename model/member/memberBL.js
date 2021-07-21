const Member = require('./memberModel')

exports.countMembers = function () {
    return new Promise((resolve, reject) => {
        Member.countDocuments({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.addMember = function (obj) {
    return new Promise((resolve, reject) => {
        let member = new Member({
            memberId: obj.id,
            name: obj.name,
            email: obj.email,
            city: (typeof obj.city != 'undefined') ? obj.city : obj.address.city
        });
        // console.log(member)
        member.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve('Created with id: ' + member._id)
            }
        })
    });
}

exports.getAllMembers = function (){
    return new Promise((resolve, reject) => {
        Member.find({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getMember = function (id) {
    return new Promise((resolve, reject) => {
        Member.findById(id, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.updateMember = function (id, obj) {
    return new Promise((resolve, reject) => {
        Member.findByIdAndUpdate(id, {
            name: obj.name,
            email: obj.email,
            city: obj.city
        }, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve('Updated!')
            }
        })
    });
}

exports.deleteMember = function (id) {
    return new Promise((resolve, reject) => {
        Member.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve('Deleted!')
            }
        })
    })
}