function sendSearchQueryData(searchData) { 
    $.ajax({ 
        url: '/process', 
        type: 'POST', 
        data: {'search_data': searchData}, 
        success: function(response) { 
            console.log(response); 
        }, 
        error: function(error) { 
            console.log(error); 
        } 
    }); 
}
