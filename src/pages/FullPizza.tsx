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
        to="/"
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
        <img src={pizza.imageUrl} />
        <div className="fullPizza__left">
          <div className="pizza-desc">
            <div className="pizza-title">
              <h2>{pizza.title}</h2>
              {/* <h4>
                <span>Ціна:</span>
                {`${pizza.price} ₴`}
              </h4> */}
            </div>
            <p>
              <span>Інградієнти:</span> <br />
              {pizza.description}
            </p>
            {/* <div className="pizza-block__selector">
              <ul>
                <li className="active">тонке</li>
              </ul>
              <ul>
                <li className="active">30 см.</li>
                <li className="">40 см.</li>
              </ul>
            </div>
            <div className="button button--outline button--add">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"></path>
              </svg>
              <span>Додати</span>
            </div> */}
            <TypesPizza id={0} types={[]} sizes={[]} {...pizza} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPizza;
