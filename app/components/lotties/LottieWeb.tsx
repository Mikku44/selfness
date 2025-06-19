export default function LottieWeb({className = " ",src} : {className?:string,src:string}) {
    return (
        <div>
            {/* Loads the dotLottie player script */}
            <script 
                src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" 
                type="module"
            ></script>
            
            {/* The Lottie player element */}
            <div className={className}>
                <dotlottie-player
                    src={src}
                    background="transparent"
                    speed="1"
                    direction="1"
                    autoplay
                    loop
                ></dotlottie-player>
            </div>
        </div>
    )
}