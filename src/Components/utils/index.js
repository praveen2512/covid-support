export const searchList = (list, searchTerm) => {
    var searchResult = [];
    try {
        if(list.length > 0){
            searchResult = list.filter(item => {
                return Object.keys(item).some((key) => {
                    if(typeof item[key] === 'string'){
                        return item[key].toLowerCase().includes(searchTerm.toLowerCase());
                    }
                })
            });
        }
        return searchResult ;
    } catch (error) {
        console.error(`Error occurred while search List :: ${error}`)
    }
}