import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TypesPizza from '../components/TypesPizza';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    price: number;
    title: string;
    description: string;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://afeee7ffe1f0418f.mokky.dev/items/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Помилка піци');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza)
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <h2>Завантаження...</h2>
      </div>
    );

  return (
    <>
      <Link
        to="/react-pizza"
        className="button button--outline button--add go-back-btn full-pizza">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>Повернутись назад</span>
      </Link>
      <div className="fullPizza">
        <img src={require(`../assets/pizzas/${pizza.imageUrl}`)} />
        <div className="fullPizza__left">
          <div className="pizza-desc">
            <div className="pizza-title">
              <h2>{pizza.title}</h2>
            </div>
            <p>
              <span>Інградієнти:</span> <br />
              {pizza.description}
            </p>

            <TypesPizza id={0} types={[]} sizes={[]} {...pizza} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPizza;
