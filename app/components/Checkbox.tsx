import '~/css/checkbox.css';

export default function Checkbox({text="",...props}) {
   
    return (
        <label className="container flex gap-2 items-center">
            <input {...props} type="checkbox" />
            <div className="checkmark" />
            <div className="">{text}</div>
        </label>
    )
}
