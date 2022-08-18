import React from 'react';
import parse from 'html-react-parser';

const Readmore = ({ text, length = 500 }) => {
    const [showLess, setShowLess] = React.useState(true);

    if (text.length < length) {
        return (<div className="description__text">{parse(text)}</div>);
    }

    return (
        <div className="description__text">
            {
                showLess ? parse(`${text.slice(0, length)}...`) : parse(text)
            }
            <div className="description__more">
                <button
                    onClick={() => setShowLess(!showLess)}
                >
                    {showLess ? "Xem thêm" : "Rút gọn"}
                </button>
            </div>
        </div>
    );
};

export default Readmore;
