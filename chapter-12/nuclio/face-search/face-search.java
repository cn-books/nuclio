import io.nuclio.Context;
import io.nuclio.Event;
import io.nuclio.EventHandler;
import io.nuclio.Response;

import com.baidu.aip.face.AipFace;
import com.baidu.aip.util.Base64Util;
import org.json.JSONObject;
import java.nio.charset.StandardCharsets;


public class Handler implements EventHandler {

        //设置APPID/AK/SK
    private   String APP_ID = "****";
    private   String API_KEY = "****";
    private   String SECRET_KEY = "****";
    private   AipFace client = null;
    {
        client = new AipFace(APP_ID, API_KEY, SECRET_KEY);

    }

    @Override
    public Response handleEvent(Context context, Event event) {

        byte[] byteBody = event.getBody();
        String body = new String(byteBody, StandardCharsets.UTF_8);
        com.alibaba.fastjson.JSONObject bodyObj = com.alibaba.fastjson.JSON.parseObject(body);
        String image = bodyObj.getString("image");

        JSONObject res = client.search(image, "BASE64", "lbn_001", null);

       return new Response().setBody(res.toString());
    }
}