import React, { useEffect, useState } from 'react';
import axios from "axios";

interface Card {
    name: string;
    imageUrl: string;
}

const CardList: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get<Card[]>('/api/Pokemon/routes/cardRoutes');
                setCards(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch cards');
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Pokemon Cards</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {cards.map((card) => (
                    <div key={card.name} style={{ margin: '10px', textAlign: 'center' }}>
                        <img src={card.imageUrl} alt={card.name} style={{ width: '100px', height: '100px' }} />
                        <p>{card.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardList;