
Papa.parse('dataset.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {
    const labels = [];
    const values = [];

    results.data.forEach(row => {
      labels.push(row.song_title);
      values.push(Number(
        String(row.total_streams_billions).replace(/[^0-9.-]/g, '')
      ));
    });

    new Chart(document.getElementById('revenueChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Spotify Streams (billions)',
          data: values,
          backgroundColor: '#4e79a7'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Total Streams (billions)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Song Title'
            }
          }
        }
      }
    });
  },

  error: function(err) {
    console.error('Failed to load dataset:', err);
  }
});

