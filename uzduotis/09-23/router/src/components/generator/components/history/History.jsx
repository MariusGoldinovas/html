

const History = ({ passwordHistory }) => {
    return (
        <div className="mt-5">
            <h4>Latest 10 Generated Passwords</h4>
            {passwordHistory.length > 0 ? (
                <ul className="list-group">
                    {passwordHistory.map((password, index) => (
                        <li key={index} className="list-group-item">
                            {password}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Kol kas neturime duomenų.</p>
            )}
        </div>
    );
};

export default History;
