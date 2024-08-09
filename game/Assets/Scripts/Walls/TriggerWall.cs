using UnityEngine;

public class TriggerWall : MonoBehaviour
{
    private readonly float[] speeds = { 6.0f, 7.0f, 8.0f, 9.0f, 10.0f, 11.0f };
    private readonly float[] speeds2 = { 7.0f, 8.0f, 9.0f, 10.0f, 11.0f, 12.0f };
    private GameScene gameScene;
    private bool hasFinished;
    private float speed;

    void Start()
    {
        Init();
    }

    void Update()
    {
        // 벽 이동
        gameObject.transform.Translate(speed * Time.deltaTime * Vector3.up);
        // 충돌 체크
        CheckCollision();
        // 범위 체크
        if (transform.position.z < -5) Destroy(gameObject);
    }

    private void Init()
    {
        gameScene = FindObjectOfType<GameScene>();
        SetSpeed();
        hasFinished = false;
    }

    // 난이도에 따른 벽 속도 설정
    private void SetSpeed()
    {
        int diffLevel = Managers.Play.diffLevel;
        if (gameScene.round == 1)
        {
            speed = (diffLevel >= 1 && diffLevel <= 6) ? speeds[diffLevel - 1] : 8.0f;
        }
        else
        {
            speed = (diffLevel >= 1 && diffLevel <= 6) ? speeds2[diffLevel - 1] : 8.0f;
        }
    }

    // 충돌 체크
    private void CheckCollision()
    {
        if (gameScene == null || hasFinished || transform.position.z > -1) return;

        if (!gameScene.getPoint)
        {
            if (gameScene.round < 3)
            {
                gameScene.UpdateScore();
            }
            gameScene.colliders.Clear();
        }
        else
        {
            hasFinished = true;
            gameScene.getPoint = false;
        }
    }
}
