export default (array) => {
    let groupSize = 2;
    
    let groups = array.map(function(item, index){
      
      return index % groupSize === 0 ? array.slice(index, index + groupSize) : null; 
      })
      .filter(function(item){ return item; 
    });

    // console.log(groups)
    return groups
}