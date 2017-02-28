import React from 'react'; 

//stateless function 
const Header = (props) =>{
return (
        <header className="top">
            <h1>Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
            Day</h1>
            <h3 className="tagline"><span>{props.tagline}</span></h3>
        </header>    
    )
}

// 定義接受的參數 大小寫注意
Header.propTypes = {
    tagline: React.PropTypes.string.isRequired
}

export default Header;