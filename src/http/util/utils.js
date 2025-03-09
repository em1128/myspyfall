
class Utils{
    // Convert Data to ColList Format
    getColList(data, colList){
        const newColList = {};
        for(const key in colList){
            if(key in data){
                newColList[key] = data[key];
            }
            // Make Blank to NULL
            if(data[key] == ''){
                newColList[key] = null;
            }
        }
        return newColList;
    }

}
module.exports = new Utils();