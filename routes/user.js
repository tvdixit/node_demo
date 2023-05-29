const express = require('express');
const router = express.Router()

const { Signup, Login, Getdata, Paginate, GetdataByid, Update, UpdatedData, Delete, Match, Group, Alldata, MatchGroup, MatchGroupSort, MatchGroupSortGroup, Unwind, GroupAvg } = require("../controller/userController"); // import file

const multer = require('multer');

const { v4: uuidv4 } = require('uuid');
const multiple = 5
const Upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'upload/image')
            // console.log(multer.diskStorage);
        },
        filename: (req, file, cb) => {
            const fileExtName = file.originalname.substring(file.originalname.lastIndexOf('.'));
            const fileName = `${uuidv4()}${fileExtName}`;
            cb(null, fileName);
            // console.log(file.originalname);
            // console.log(file);
        }
    })
}).fields([{ name: 'image' }, { name: 'image1' }])
// }).array('image', multiple)
// }).single('image', multiple);
router.post("/upload/image", Upload, async (req, res) => {
    res.send("file upload")
})


router.post(
    "/register",

    Signup,
);

router.post(
    "/login",
    Login,
);

router.get(
    "/getdata",
    Getdata,
);

router.get(
    "/paginate",
    Paginate,
);

router.get(
    "/getdata/:id",
    GetdataByid,
);

router.post(
    "/updatebyemail",
    Update,
);

router.patch(
    "/updatedata",
    UpdatedData,
);

router.get(
    "/delete/:id",
    Delete
)
// aggregation:
router.get(
    "/aggregate/match",
    Match
)

router.get(
    "/aggregate/group",
    Group
)

router.get(
    "/aggregate/alldata",
    Alldata
)

router.get(
    "/aggregate/match/group",
    MatchGroup
)

router.get(
    "/aggregate/match/group/sort",
    MatchGroupSort
)

router.get(
    "/aggregate/match/group/sort/group",
    MatchGroupSortGroup
)

router.get(
    "/aggregate/unwind",
    Unwind
)

router.get(
    "/aggregate/group/avg",
    GroupAvg
)
module.exports = router;