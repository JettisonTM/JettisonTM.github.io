fetch('data.json')
  .then(res => res.json())
  .then(data => {
    document.title = data.pageTitle;
    document.getElementById('page-title').textContent = data.pageTitle;
    document.getElementById('page-description').textContent = data.pageDescription;

    const container = document.getElementById('content-container');

    data.items.forEach(item => {
      const itemBox = document.createElement('div');
      itemBox.className = 'item-box';

      if (item.versions.length > 1) {
        itemBox.classList.add('multiple-versions');
      }

      item.versions.forEach((version, index) => {
        const versionDiv = document.createElement('div');
        versionDiv.className = 'item-version';

        // Title and date per version
        const versionTitle = document.createElement('div');
        versionTitle.className = 'item-full-title';
        versionTitle.textContent = `${version.name} - ${version.date}`;
        versionDiv.appendChild(versionTitle);

        // Text description
        const textDiv = document.createElement('div');
        textDiv.className = 'version-text';
        textDiv.innerHTML = version.description.replace(/\n/g, '<br>');

        // Media (image, audio, or YouTube)
        const mediaDiv = document.createElement('div');
        mediaDiv.className = 'version-media';

        if (version.image) {
          const img = document.createElement('img');
          img.src = version.image;
          img.className = 'cover-image';
          mediaDiv.appendChild(img);
        }

        if (version.audio) {
          const audio = document.createElement('audio');
          audio.controls = true;
          audio.className = 'cover-image';
          const source = document.createElement('source');
          source.src = version.audio;
          source.type = 'audio/mpeg';
          audio.appendChild(source);
          mediaDiv.appendChild(audio);
        }

        if (!version.audio && version.youtube) {
          const youtubeLink = document.createElement('a');
          youtubeLink.href = version.youtube;
          youtubeLink.target = '_blank';
          youtubeLink.rel = 'noopener noreferrer';
          youtubeLink.textContent = version.youtubeText || '▶ The Sample I Used';
          youtubeLink.className = 'youtube-link';
          mediaDiv.appendChild(youtubeLink);
        }

        versionDiv.appendChild(textDiv);
        versionDiv.appendChild(mediaDiv);
        itemBox.appendChild(versionDiv);

        if (index < item.versions.length - 1) {
          const hr = document.createElement('hr');
          itemBox.appendChild(hr);
        }
      });

      container.appendChild(itemBox);
    });
  })
  .catch(err => {
    console.error("Failed to load data.json", err);
  });
