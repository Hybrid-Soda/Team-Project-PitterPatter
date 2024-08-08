using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SoundManager
{
    AudioSource[] _audioSources = new AudioSource[(int)Define.Sound.MaxCount];
    Dictionary<string, AudioClip> _audioClips = new Dictionary<string, AudioClip>();

    private string _lastBgmPath = "";
    private AudioSource _nowBGM = null;

    public string LastBgmPath
    {
        get { return _lastBgmPath; }
    }

    public AudioSource NowBGM
    {
        get { return _nowBGM; }
    }

    public void Init()
    {
        GameObject root = GameObject.Find("@Sound");
        if(root == null)
        {
            root = new GameObject { name = "@Sound" };
            Object.DontDestroyOnLoad(root);


            string[] soundNames = System.Enum.GetNames(typeof(Define.Sound));
            for (int i = 0; i < soundNames.Length - 1; i++)
            {
                GameObject go = new GameObject { name = soundNames[i] };
                _audioSources[i] = go.AddComponent<AudioSource>();
                go.transform.parent = root.transform;
            }

            _audioSources[(int)Define.Sound.BGM].loop = true;
        }
    }

    public void Play(string path, Define.Sound type = Define.Sound.SFX, float volume = 0.5f)
    {
        if (type == Define.Sound.BGM && _lastBgmPath == path) return;
        AudioClip audioClip = GetOrAddAudioClip(path, type);
        Play(audioClip, type, volume);

        if (type == Define.Sound.BGM)
        {
            _lastBgmPath = path;
        }

    }
    public void Play(AudioClip audioClip, Define.Sound type = Define.Sound.SFX, float volume = 0.5f)
    {
        if (audioClip == null) return;

        if (type == Define.Sound.BGM)
        {
            AudioSource audioSource = _audioSources[(int)Define.Sound.BGM];
            if (audioSource.isPlaying) audioSource.Stop();
            audioSource.volume = volume;
            audioSource.clip = audioClip;
            audioSource.Play();
            _nowBGM = audioSource;
        }
        else
        {
            AudioSource audioSource = _audioSources[(int)Define.Sound.SFX];
            audioSource.volume = volume;
            audioSource.PlayOneShot(audioClip);
        }
    }

    public void Clear()
    {
        foreach(AudioSource audioSource in _audioSources)
        {
            audioSource.clip = null;
            audioSource.Stop();
        }
        _audioClips.Clear();
    }

    AudioClip GetOrAddAudioClip(string path, Define.Sound type = Define.Sound.SFX)
    {
        if (path.Contains("Sounds/") == false) path = $"Sounds/{path}";

        AudioClip audioClip = null;
        if (type == Define.Sound.BGM)
        {
            audioClip = Managers.Resource.Load<AudioClip>(path);

        }
        else
        {
            if (_audioClips.TryGetValue(path, out audioClip) == false)
            {
                audioClip = Managers.Resource.Load<AudioClip>(path);
                _audioClips.Add(path, audioClip);
            }
        }

        if (audioClip == null)
            Debug.Log($"AudioClip Missing {path}");

        return audioClip;
    }


    public void PauseBgm()
    {
        NowBGM.Pause();
    }

    public void ResumeBgm()
    {
        NowBGM.UnPause();
    }
}
