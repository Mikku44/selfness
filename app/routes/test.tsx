import BubblyButton from "~/components/BubbleButton";


export default function test() {
    return (
        <div style={{
            overflow: 'hidden',
            // background: 'rgb(20,20,20)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <BubblyButton className="bg-none">
                <div className="btn-primary">Click Me!</div>
            </BubblyButton>
        </div>
    )
}


