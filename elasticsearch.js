

const { Client } = require('@elastic/elasticsearch');
const client = new Client({
    node: 'http://elasticsearch:9200/'
});

const result = client.search({
    index: 'songs',
    query:{
        match: {
            _id: '0'
        }

    }
})



