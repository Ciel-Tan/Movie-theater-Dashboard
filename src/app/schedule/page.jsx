'use client';

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from '@/components/modal/Modal';
import { useGetShowtime } from '@/hooks/useGetShowtime';
import RotationLoading from '@/components/loading/RotationLoading';
import '@/styles/customModal.css'
import '@/styles/fullCalendar.css';
import { useGetRoom } from '@/hooks/useGetRoom';
import { useActionShowtime } from '@/hooks/useActionShowtime';
import { useToastNotify } from '@/utils/toast';
import Loader from '@/components/loading/Loader';
import { MdDelete } from "react-icons/md";
import { customFormatDate } from '@/utils/formatDay';
import Image from 'next/image';

export default function SchedulePage() {
  const { showtimeData, loading, error } = useGetShowtime();
  const { roomsData } = useGetRoom();
  const { createShowtime, editShowtime, deleteShowtime, actionShowtime, actionLoading, success, actionError } = useActionShowtime();

  const [showtime, setShowtime] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (showtimeData.length > 0) {
      setShowtime(showtimeData);
    }
  }, [showtimeData]);

  const openAdd = (date) => {
    setEditing(null);
    setForm({ show_datetime: date ? `${date}T00:00` : '' });
    setIsModalOpen(true);
  };

  const openEdit = (st) => {
    setEditing(st);
    setForm({ ...st, show_datetime: st.show_datetime.slice(0, 16) });
    setIsModalOpen(true);
  };

  const openDelete = (st) => {
    setToDelete(st);
    setIsDeleteOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((f) => {
      const newForm = { ...f };

      if (name === 'title') {
        newForm.movie = {
            ...f.movie,
            title: value,
        };
      }
      else if (name === 'room_id') {
        const selectedRoom = roomsData.find((room) => room.room_id === parseInt(value, 10));
        newForm.room = selectedRoom || {};
      }
      else {
        newForm[name] = value;
      }

      return newForm;
    });
  };

  useToastNotify(success, actionError, '/schedule');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await editShowtime(editing.showtime_id, form);

      setShowtime((sts) => sts.map((st) => st.showtime_id === editing.showtime_id ? { ...st, ...form } : st));
    }
    else {
      const newShowtime = await createShowtime(form);
      setShowtime((sts) => [...sts, newShowtime]);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (toDelete) {
      await deleteShowtime(toDelete.showtime_id);
      setShowtime((sts) => sts.filter((st) => st.showtime_id !== toDelete.showtime_id));
    }
    setIsDeleteOpen(false);
    setIsModalOpen(false);
  };

  const handleDateClick = (arg) => openAdd(arg.dateStr);
  const handleEventClick = (arg) => {
    const id = parseInt(arg.event.id, 10);
    const st = showtime.find((s) => s.showtime_id === id);
    if (st) openEdit(st);
  };

  return (
    <div className="p-8">
      <h1 className="Schedule-title">Movie Schedule Management</h1>
      {loading ? (
        <RotationLoading />
      ) : error ? (
        <span className="error">{error}</span>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={
            showtime.map((st) => ({
              id: String(st.showtime_id),
              title: st.movie.title,
              start: st.show_datetime
            }))
          }
          eventContent={arg => {
            const formattedTime = customFormatDate(arg.event.start, 'HH:mm');
            return {
              html: `<div>${formattedTime} - ${arg.event.title}</div>`
            };
          }}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          // height="auto"
        />
      )}

      <Modal
        isOpen={isModalOpen}
        title={editing ? 'Edit Showtime' : 'Add Showtime'}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="modal-form">
          {editing && (
            <div className="form-group">
              <img
                src={form.movie?.poster_image || '/image/noImage.jpg'}
                alt="poster"
                className="poster-image"
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={form.movie?.title || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Room</label>
            <select
              onChange={handleChange}
              name="room_id"
              defaultValue={form.room?.room_id || ''}
              className="form-select"
              required
            >
              <option value="">Select Room</option>
              {roomsData.map((room) => (
                <option key={room.room_id} value={room.room_id}>
                  {room.room_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date & Time</label>
            <input
              type="datetime-local"
              name="show_datetime"
              value={form.show_datetime || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {actionLoading ? <Loader /> : editing ? 'Update' : 'Create'}
            </button>
            {editing && (
              <MdDelete
                size={32}
                color="green"
                cursor={'pointer'}
                className="delete-icon"
                onClick={() => openDelete(editing)}
              />
            )}
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <div className='delete-image'>
          <Image
            src="/image/trash-can.png" alt="trash-can"
            width={100} height={100}
          />
        </div>
        <div className='delete-content'>
          <p className='delete-text'>
            Are you sure you want to delete this schedule?
          </p>
          <span className='delete-data'>
             &quot;<i>{customFormatDate(toDelete?.show_datetime, 'dd/MM/yyyy HH:mm')}</i>  &quot; for movie:  &quot;<i>{toDelete?.movie?.title}</i>  &quot;
          </span>
        </div>
        <div className="delete-actions">
          <button
            onClick={() => setIsDeleteOpen(false)}
            className="delete-button cancel"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="delete-button confirm"
          >
            {actionLoading ? <Loader /> : 'Delete'}
          </button>
        </div>
      </Modal>
    </div>
  );
}