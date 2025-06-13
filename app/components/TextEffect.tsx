

export default function TextEffect({ clickedCount }: { clickedCount: number }) {
    const getTextSizeClass = (count: number) => {
        if (count >= 100) return 'text-7xl'; // Very large for high counts
        if (count >= 50) return 'text-6xl';
        if (count >= 20) return 'text-5xl';
        if (count >= 10) return 'text-4xl';
        return 'text-3xl'; // Default size
    };

    // Function to determine text color based on count
    const getTextColorClass = (count: number) => {
        if (count >= 100) return 'text-blue-500'; // Darkest red for very high counts
        if (count >= 50) return 'text-red-700';
        if (count >= 20) return 'text-red-600';
        if (count >= 10) return 'text-orange-500';
        if (count > 0) return 'text-yellow-400'; // Lightest red for any positive count
        return 'text-white'; // Default color when 0
    };

    const textSizeClass = getTextSizeClass(clickedCount);
    const textColorClass = getTextColorClass(clickedCount);

    return (
        <div
            className={`py-2 font-bold transition-all duration-300 ${textSizeClass} ${textColorClass}`}
        >
            {clickedCount}
        </div>
    )
}
