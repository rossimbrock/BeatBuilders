function sendSearchQueryData(searchData) { 
    $.ajax({ 
        url: '/searchQuery', 
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
