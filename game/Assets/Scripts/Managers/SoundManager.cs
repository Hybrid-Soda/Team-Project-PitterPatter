using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

public class SoundManager
{
    // Define.Sound의 크기만큼 AudioSource 배열 생성 (BGM, SFX 등)
    AudioSource[] _audioSources = new AudioSource[(int)Define.Sound.MaxCount];
    // 오디오 클립을 캐싱하기 위한 딕셔너리, 키는 오디오 클립의 경로
    Dictionary<string, AudioClip> _audioClips = new Dictionary<string, AudioClip>();

    public float volume = 0.5f;
    private string _lastBgmPath = "";
    private AudioSource _nowBGM = null;

    // 마지막으로 재생된 BGM 경로 반환
    public string LastBgmPath
    {
        get { return _lastBgmPath; }
    }

    // 현재 재생 중인 BGM 오디오 소스 반환
    public AudioSource NowBGM
    {
        get { return _nowBGM; }
    }

    public void Init()
    {
        // @Sound라는 이름의 루트 오브젝트를 찾거나 새로 생성
        GameObject root = GameObject.Find("@Sound");
        if(root == null)
        {
            root = new GameObject { name = "@Sound" };
            Object.DontDestroyOnLoad(root);

            // Define.Sound enum에 정의된 이름을 사용하여 각각의 AudioSource를 설정
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

    // 지정된 경로의 사운드를 재생
    public void Play(string path, Define.Sound type = Define.Sound.SFX)
    {
        if (type == Define.Sound.BGM && _lastBgmPath == path) return;
        
        AudioClip audioClip = GetOrAddAudioClip(path, type);
        Play(audioClip, type);

        if (type == Define.Sound.BGM) _lastBgmPath = path;
    }

    // 이미 로드된 오디오 클립을 재생
    public void Play(AudioClip audioClip, Define.Sound type = Define.Sound.SFX)
    {
        if (audioClip == null) return;

        // BGM 재생 : 기존 재생 중이던 BGM을 중지하고 새로운 클립을 재생
        if (type == Define.Sound.BGM)
        {
            AudioSource audioSource = _audioSources[(int)Define.Sound.BGM];
            if (audioSource.isPlaying) audioSource.Stop();
            audioSource.volume = volume;
            audioSource.clip = audioClip;
            audioSource.Play();
            _nowBGM = audioSource;
        }
        // SFX 재생 : OneShot 메서드를 사용하여 클립을 재생
        else
        {
            AudioSource audioSource = _audioSources[(int)Define.Sound.SFX];
            audioSource.volume = volume;
            audioSource.PlayOneShot(audioClip);
        }
    }

    // 모든 오디오 소스 정리
    public void Clear()
    {
        foreach(AudioSource audioSource in _audioSources)
        {
            audioSource.clip = null;
            audioSource.Stop();
        }
        _audioClips.Clear();
    }

    // 오디오 클립을 딕셔너리에서 가져오거나 새로 로드
    AudioClip GetOrAddAudioClip(string path, Define.Sound type = Define.Sound.SFX)
    {
        if (path.Contains("Sounds/") == false) path = $"Sounds/{path}";

        AudioClip audioClip;

        // BGM : 즉시 로드
        if (type == Define.Sound.BGM)
        {
            audioClip = Managers.Resource.Load<AudioClip>(path);

        }
        // SFX : 딕셔너리에 캐싱된 클립이 있는지 확인 후, 없으면 새로 로드하여 캐싱
        else
        {
            if (_audioClips.TryGetValue(path, out audioClip) == false)
            {
                audioClip = Managers.Resource.Load<AudioClip>(path);
                _audioClips.Add(path, audioClip);
            }
        }

        // 클립이 없으면 디버그 로그 출력
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
