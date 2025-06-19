import { useEffect, useRef } from 'react';
import { DotLottie } from '@lottiefiles/dotlottie-web';

const LottieAnimation = ({
  src = "https://lottie.host/0cbdb3ef-2fa5-4d1d-9e4e-f66c879e010d/D0bRr9d93F.lottie",
  className = ""
}:
  { src: string,
    className? : string;
   }) => {
  const containerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (containerRef.current != null) {
      const dotLottie = new DotLottie({
        canvas: containerRef.current,
        src: src,
        loop: true,
        autoplay: true
      });
    }
  }, [containerRef.current]);

  return <canvas className={className} ref={containerRef} />;
};

export default LottieAnimation;
