import React from "react";

class MovieTab extends React.Component {
    render() {
        const { sort_by, changeSortBy } = this.props;
        const handleClick = value => () => {changeSortBy(value)};
        const getClassLink = value => {
            return `nav-link ${sort_by===value ? "active" : ""}`;
        };

        return (
            <ul className="tabs nav nav-pills">
                <li className="nav-item">
                    <div className={getClassLink("popularity.desc")}
                         onClick={handleClick("popularity.desc")}
                    >
                        Popularity desc
                    </div>
                </li>
                <li className="nav-item">
                    <div className={getClassLink("revenue.desc")}
                         onClick={handleClick("revenue.desc")}
                    >
                        Revenue desc
                    </div>
                </li>
                <li className="nav-item">
                    <div className={getClassLink("vote_average.desc")}
                         onClick={handleClick("vote_average.desc")}
                    >
                        Vote average
                    </div>
                </li>
            </ul>
        );
    }
}

export default MovieTab;