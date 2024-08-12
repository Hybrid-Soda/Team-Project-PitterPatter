using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Managers : MonoBehaviour
{
    static Managers instance;
    static Managers Instance { get { Init(); return instance; } }

    // 개별 매니저 클래스들에 대한 참조
    MapManager _map;
    NetworkManager _network;
    CoroutineManager _coroutine;
    PlayManager _play = new PlayManager();
    SoundManager _sound = new SoundManager();
    ExSceneManager _scene = new ExSceneManager();
    ResourceManager _resource = new ResourceManager();

    // 각 매니저 클래스에 대한 정적 프로퍼티 제공 (외부 접근)
    public static MapManager Map { get; private set; }
    public static NetworkManager Network { get; private set; }
    public static CoroutineManager Coroutine { get; private set; }
    public static PlayManager Play { get { return Instance._play; } }
    public static SoundManager Sound { get { return Instance._sound; } }
    public static ExSceneManager Scene { get { return Instance._scene; } }
    public static ResourceManager Resource { get { return Instance._resource; } }


    void Start()
    {
        Init();
    }

    // 싱글톤 인스턴스 초기화
    static void Init()
    {
        if (instance == null)
        {
            // "@Managers" 이름의 게임 오브젝트 탐색
            GameObject gameObject = GameObject.Find("@Managers");

            // 게임 오브젝트가 존재하지 않으면 새로 생성
            if (gameObject == null)
            {
                gameObject = new GameObject { name = "@Managers" };
            }

            // 게임 오브젝트에 Managers 컴포넌트가 추가되어 있지 않으면 추가
            if (gameObject.GetComponent<Managers>() == null)
            {
                gameObject.AddComponent<Managers>();
                Map = gameObject.AddComponent<MapManager>();
                Network = gameObject.AddComponent<NetworkManager>();
                Coroutine = gameObject.AddComponent<CoroutineManager>();
            }

            // 오브젝트가 씬 전환 시 파괴되지 않도록 설정 및 Managers 컴포넌트 인스턴스 설정
            DontDestroyOnLoad(gameObject);
            instance = gameObject.GetComponent<Managers>();
            
            instance._sound.Init();
        }
    }
}