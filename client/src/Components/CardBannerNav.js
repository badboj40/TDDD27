import { Card, Nav } from "react-bootstrap";
import { HandleItemClick } from "../Helpers/HandleItemClick";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";


export function CardBannerNav(props) {
    const notFoundLogo = "/static/images/unknown-file-icon.png"
    const movie_kv = props.movie_kv
    const dispatch = props.dispatch
    const navigate = props.navigate
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Nav>
            <Nav.Link onClick={async () => {
                setIsLoading(true)
                await HandleItemClick(movie_kv, dispatch, navigate, 'movie')
                    .then(() => {
                        console.log(isLoading);
                        setIsLoading(false);
                    })
            }}
                style={{ padding: 0 }}>
                {isLoading ? <LoadingSpinner
                    isLoading={isLoading}
                    animation="grow"
                    size="lg"
                    variant="light"
                    style={{
                        position: 'absolute',
                        width: '100px',
                        height: '100px',
                        // UNDVIK MARGIN, GÖR DYNAMISK OM MÖJLIGT
                        marginLeft: '145px',
                        marginTop: '145px'
                    }}
                /> : <></>}
                <Card.Img variant="top"
                    src={movie_kv[1].banner}
                    onError={(e) => { e.target.src = notFoundLogo }} />
            </Nav.Link>
        </Nav>
    )
}