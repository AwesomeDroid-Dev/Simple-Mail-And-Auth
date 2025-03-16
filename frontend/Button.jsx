export default function TestButton() {
    return (
        <button
            style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
            }}
            onClick={() => console.log('Test button clicked')}
        >
            <Text />
        </button>
    );
}
