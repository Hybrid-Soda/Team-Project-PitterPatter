using UnityEngine;

public class TriggerWall : MonoBehaviour
{
    private GameScene gameScene;
    private float speed;
    private bool fin;
    private readonly float[] speeds = { 6.0f, 7.0f, 8.0f, 9.0f, 10.0f, 11.0f };

    void Start()
    {
        gameScene = FindObjectOfType<GameScene>();
        SetSpeed();
        fin = false;
    }

    void Update()
    {
        gameObject.transform.Translate(speed * Time.deltaTime * Vector3.up); // 벽 이동

        if (gameScene != null && !fin && transform.position.z <= -1)
        {
            if (!gameScene.getPoint)
            {
                if (gameScene.round < 3) {
                    gameScene.UpdateScore(gameScene.round);
                }
                gameScene.colliders.Clear();
            }
            else
            {
                fin = true;
                gameScene.getPoint = false;
            }
        }

        if (transform.position.z < -5)
        {
            Destroy(gameObject);
        }
    }

    private void SetSpeed()
    {
        // 난이도에 따른 벽 속도 설정
        int difficultyLevel = GameManager.Instance.difficultyLevel;
        speed = (difficultyLevel >= 1 && difficultyLevel <= 6) ? speeds[difficultyLevel - 1] : 8.0f;
    }
}
