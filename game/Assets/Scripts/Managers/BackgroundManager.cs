using UnityEngine;

public class BackgroundManager : MonoBehaviour
{
    // 싱글톤 인스턴스
    private static BackgroundManager instance;

    // 배경 오브젝트를 저장할 변수
    private GameObject background;

    // 배경 프리팹 배열
    public GameObject[] backgroundPrefabs;

    // 인스턴스에 접근할 수 있는 프로퍼티
    public static BackgroundManager Instance
    {
        get
        {
            if (instance == null)
            {
                // Scene에 BackgroundManager 오브젝트가 없다면 새로 생성
                GameObject singletonObject = new GameObject();
                instance = singletonObject.AddComponent<BackgroundManager>();

                // 씬이 전환될 때 파괴되지 않도록 설정
                DontDestroyOnLoad(singletonObject);
            }
            return instance;
        }
    }

    // 싱글톤이 중복 생성되지 않도록 설정
    private void Awake()
    {
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else if (instance != this)
        {
            Destroy(gameObject);
        }
    }

    private void Start()
    {
        SetRandomBackground();
    }


    // 배경을 설정하는 메서드
    public void SetBackground(GameObject backgroundPrefab)
    {
        if (background != null)
        {
            Destroy(background);
        }

        background = Instantiate(backgroundPrefab, Vector3.zero, backgroundPrefab.transform.rotation);
        DontDestroyOnLoad(background);
    }

    // 배경을 가져오는 메서드
    public GameObject GetBackground()
    {
        return background;
    }

    // 1~5까지 랜덤 숫자를 입력받아 해당하는 프리팹을 설정하는 메서드
    public void SetRandomBackground()
    {
        if (backgroundPrefabs.Length == 0)
        {
            Debug.LogError("No background prefabs assigned.");
            return;
        }

        int randomIndex = Random.Range(0, backgroundPrefabs.Length); // 0부터 배열 길이-1까지 랜덤 숫자 생성
        GameObject backgroundPrefab = backgroundPrefabs[randomIndex];

        if (backgroundPrefab != null)
        {
            SetBackground(backgroundPrefab);
        }
        else
        {
            Debug.LogError("Prefab at index " + randomIndex + " is null.");
        }
    }
}
