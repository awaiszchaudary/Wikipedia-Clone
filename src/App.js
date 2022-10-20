import React , {useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './index.css';
import { FaSistrix } from "react-icons/fa";

const App = () => {

    const [text , setText] = useState('');

    const [results , setResults] = useState([]);

    




    const onFormSubmit = async(event) => {
        event.preventDefault();
        const response = await axios.get('https://en.wikipedia.org/w/api.php' , {
            params : {
               action : 'query',
               list : 'search', 
               origin : '*' ,
               format : 'json' ,
               srsearch : text 
            }
        })

        console.log(response);

        setResults(response.data.query.search);
        setText('');
        
    }

    const output = results.map((item) => {
        return (
            <div id = 'data' className = 'my-3'>
                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-12'>
                            <div>
                                <h4>{item.title}</h4>
                            </div>
                            
                        </div>
                    </div>
                    <div className = 'row'>
                        <div className = 'col-10'>
                            <div dangerouslySetInnerHTML={{ __html: item.snippet}}></div>
                        </div>
                        <div className = 'col-2'>
                            <button id = 'button'><a href = {`https://en.wikipedia.org?curid=${item.pageid}`}>Go</a></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
       

    const onTextChange = (event) => {
        setText(event.target.value)
    }


    return (
        <div id = 'body'>

            <div className = 'container py-5'>
                <div>
                    <h1>WIKIPEDIA <FaSistrix /></h1>
                </div>
                <form onSubmit = {onFormSubmit}>
                    <label className = 'form-label'>Enter Text</label>
                    <input type = 'text' value = {text} onChange = {onTextChange} className = 'form-control'></input>
                    <div className = 'py-5'>
                        {output}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default App;

