import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const Articles = (props) => {
  console.log(props.articles);

    const [articles, getArticles] = useState('');
    const [query, getQuery] = useState('');
    const NEWS_URL = '/api/search_articles';
  
    useEffect(() => {
        getArticles(props.articles);
        getQuery(props.query);
    }, [props.articles]);
  
    let image = '';
    const styles = {
        container: {
          padding: 30
        },
        link: {
          color: 'blue',
          textDecoration: 'underline'
        }
      }
   
    return (
        <div className='container mb-5'>
            {query == 'false'? <h3 className='text-left mb-4 mt-4'></h3>:
            <h3 className='text-left mb-4 mt-4'>Search results for: {query}</h3>}
            <div className='row'>
             {articles.length > 0?
                articles.map((list, index)=>{ 
                    image = '';
                    if(list.urlToImage){
                    image = <img className="card-img-top" src={list.urlToImage} alt="Card image cap"/>
                    }
                    return (
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            
                        <div className="card  mb-3" >
                        
                        {image}
                        <div className="card-body">
                          <h5 className="card-title"><Link
                                target="_blank"
                                rel="noreferrer"
                                style={styles.link}
                                to={list.url}>{list.title}</Link></h5>
                          <p className="card-text">{list.content}</p>
                          
                        </div>
                      </div>
                      </div>

                    ) 
                }):
                "Nothing to display"
            }     

            </div>
            

        </div>
    )
        
}

export default Articles
