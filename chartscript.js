
Papa.parse('dataset.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {
    const countrySongs = {};

    results.data.forEach(row => {
      const country = row.artist_country;

      if (country && country.trim() !== '') {
        countrySongs[country] = (countrySongs[country] || 0) + 1;
      }
    });

    const sortedCountries = Object.entries(countrySongs)
      .sort((a, b) => b[1] - a[1]);

    const labels = sortedCountries.map(item => item[0]);
    const values = sortedCountries.map(item => item[1]);

    new Chart(document.getElementById('revenueChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Songs',
          data: values,
          backgroundColor: '#4e79a7'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            },
            title: {
              display: true,
              text: 'Number of Songs'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Artist Country'
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
