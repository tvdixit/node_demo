// module.exports={
//     x :10,
//     y:20
// }
exports.myDateTime = function () {
    return Date();
};
exports.dixit = function () {
    return 10 + 15;
}
const fs= require('fs').writeFileSync;
fs("xyz.txt", "abc")

