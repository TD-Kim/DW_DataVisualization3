import React, { useState } from 'react';
import './FoodList.css';
import FoodForm from './FoodForm';

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const { title, createdAt, content, calorie, imgUrl, docId, id } = item;
  const handleDeleteClick = () => {
    onDelete(docId, imgUrl);
  };
  const handleEditClick = () => {
    onEdit(id);
  };
  return (
    <div className='FoodListItem'>
      <img className='FoodListItem-preview' src={imgUrl} />
      <div className='FoodListItem-rows'>
        <div className='FoodListItem-title-calorie'>
          <h1 className='FoodListItem-title'>{title}</h1>
          <span className='FoodListItem-calorie'>{calorie}kcal</span>
        </div>
        <p className='FoodListItem-content'>{content}</p>
        <div className='FoodListItem-date-buttons'>
          <p className='FoodListItem-date'>{formatDate(createdAt)}</p>
          <div className='FoodListItem-buttons'>
            <button
              className='FoodListItem-edit-button'
              onClick={handleEditClick}
            >
              수정
            </button>
            <button
              className='FoodListItem-delete-button'
              onClick={handleDeleteClick}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);
  return (
    <ul className='FoodList'>
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, title, imgUrl, calorie, content, docId } = item;
          const initialValues = { title, calorie, content, imgUrl: null };

          const handleSubmit = (collectionName, updateObj) => {
            const result = onUpdate(collectionName, docId, updateObj, imgUrl);
            return result;
          };

          const handleSubmitSuccess = (result) => {
            onUpdateSuccess(result);
            // 수정 폼을 리스트로 변경
            setEditingId(null);
          };
          return (
            <li key={item.docId}>
              <FoodForm
                onCancel={setEditingId}
                initialValues={initialValues}
                initialPreview={imgUrl}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.docId}>
            <FoodListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
