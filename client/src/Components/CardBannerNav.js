import { Card, Nav } from "react-bootstrap";
import { HandleItemClick } from "../Helpers/HandleItemClick";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";


export function CardBannerNav(props) {
    const notFoundLogo = "/static/images/unknown-file-icon.png"
    const movie_kv = props.movie_kv
    const dispatch = props.dispatch
    const navigate = props.navigate
    const loadingStyle = props.loadingStyle
    let style = {
        position: 'absolute',
        width: '100px',
        height: '100px',
    };
    const [isLoading, setIsLoading] = useState(false);

    if (loadingStyle === 'searchResult') {
        style['marginLeft'] = 'calc(20% - 50px)'
        style['marginTop'] = 'calc(25% - 50px)'
    } else if (loadingStyle === 'list') {
        style['marginLeft'] = 'calc(54% - 65px)'
        style['marginTop'] = 'calc(50% - 50px)'
    }
    else {
        style['marginLeft'] = 'calc(5% - 65px)'
        style['marginTop'] = 'calc(50% - 50px)'
    }

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
                    style={style}
                /> : <></>}
                <Card.Img variant="top"
                    src={movie_kv[1].banner}
                    onError={(e) => { e.target.src = notFoundLogo }} />
            </Nav.Link>
        </Nav>
    )
}