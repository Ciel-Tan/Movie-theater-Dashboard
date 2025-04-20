export const toTime = (duration) => {
    if (isNaN(duration) || duration < 0) return '00:00';

    const hrs = Math.floor(duration / 3600);
    const mins = Math.floor((duration % 3600) / 60);
    const secs = Math.floor(duration % 60);

    const timeParts = [
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ];

    if (hrs > 0) {
      timeParts.unshift(hrs.toString());
    }

    return timeParts.join(':');
};