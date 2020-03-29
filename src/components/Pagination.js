import React from "react";


class Pagination extends React.Component {
    render() {
        const { totalPages, page, changePageToPrevious, changePageToNext } = this.props;
        return (
            <div className="d-flex justify-content-center">
                <ul className="tabs nav nav-pills">
                    <li className="nav-item">
                        <button className="nav-link"
                             onClick={changePageToPrevious.bind()}>
                            Previous
                        </button>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link">
                            Current page: {page}
                        </div>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link"
                                onClick={changePageToNext.bind()}>
                            Next
                        </button>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link">
                            Total pages: {totalPages}
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Pagination;