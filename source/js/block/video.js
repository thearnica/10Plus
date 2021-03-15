const promise = document.querySelector('#video').play();

if (promise !== undefined) {
  promise.catch(error => {
    console.error('Error attempting to play', error)
  }).then(() => {
    console.log('video is playing')
  });
}
