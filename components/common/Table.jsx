import { useState } from "react";
import styled from "styled-components";
import UpArrow from "../../icons/up-arrow.svg?react";
import DownArrow from "../../icons/down-arrow.svg?react";

export default ({ data, headers }) => {
  const [expandedCards, setExpandedCards] = useState([]);

  const handleExpand = (id) => () => {
    if (expandedCards.find((c) => c == id))
      setExpandedCards([...expandedCards.filter((c) => c != id)]);
    else setExpandedCards([...expandedCards, id]);
  };

  const StyledTable = styled.div`
    .headers {
      border: 1px solid white;
      display: grid;
      grid-template-columns: repeat(
        ${headers.filter((header) => header.isMain).length + 1},
        1fr
      );
      width: calc(100% - 10px);
      padding: 5px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;

      .header {
        text-decoration: underline;
      }
    }
    .cards {
      width: calc(100% - 10px);
      .card {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(
          ${headers.filter((header) => header.isMain).length + 1},
          1fr
        );
        border-right: 1px solid white;
        border-left: 1px solid white;
        border-bottom: 1px solid white;
        padding: 5px;
        &.last {
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        .icon svg {
          width: 20px;
        }
        .actions {
          cursor: pointer;
          svg {
            width: 20px;
            height: auto;
          }
        }
      }
    }
  `;

  return (
    <StyledTable>
      <div className="headers">
        {headers
          .filter((header) => header.isMain)
          .map((header) => (
            <div key={header.id} className="header">
              {header.name}
            </div>
          ))}
        <div className="header">Actions</div>
      </div>

      <div className="cards">
        {data.map((card, i) => (
          <div
            key={card.id}
            className={`card ${i == data.length - 1 ? "last" : ""}`}
          >
            {headers
              .filter((header) => header.isMain)
              .map((header) => (
                <div key={header.id}>{card[header.id]}</div>
              ))}
            <div className="actions">
              <span onClick={handleExpand(card.id)}>
                {expandedCards.find((c) => c == card.id) && <UpArrow />}
                {!expandedCards.find((c) => c == card.id) && <DownArrow />}
              </span>
            </div>
          </div>
        ))}
      </div>
    </StyledTable>
  );
};
