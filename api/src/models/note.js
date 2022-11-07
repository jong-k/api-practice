const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Date 자료형으로 createAt, updatedAt 필드 생성
  }
);
// note 스키마, 모델 정의
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
