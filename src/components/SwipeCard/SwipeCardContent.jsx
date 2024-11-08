import '../../index.css'
import './SwipeCardContent.css'

function LikeButton()
{
    return <button>btn</button>
}
function DetailsButton()
{
    return <button>btn</button>
}

function DislikeButton()
{
    return <button>btn</button>
}

export function SwipeCardContent()
{
    return (
        <div>
            <div className="SwipeCardTitle">Test Card</div>
            <div className="SwipeCardImage"></div>
            <div className="SwipeCardCompatibility"></div>
            <div className="SwipeCardPreview"></div>
            <div className="SwipeCardControls">
                <DislikeButton></DislikeButton>
                <DetailsButton></DetailsButton>
                <LikeButton></LikeButton>
            </div>
        </div>
    );
}