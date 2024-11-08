import '../../index.css'

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

function SwipeCardContent()
{
    return (
        <div style="width:200px; height:350px;">
            <div class="SwipeCardTitle">Test Card</div>
            <div class="SwipeCardImage"></div>
            <div class="SwipeCardCompatibility"></div>
            <div class="SwipeCardPreview"></div>
            <div class="SwipeCardControls">
                <DislikeButton></DislikeButton>
                <DetailsButton></DetailsButton>
                <LikeButton></LikeButton>
            </div>
        </div>
    );
}