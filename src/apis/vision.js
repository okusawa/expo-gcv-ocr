/* -*- mode: web -*- */
import request from 'superagent';

// @flow

export function detectText(apiKey: string, base64: string, callback: Function) {
  return request.post(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`)
                .set('Content-Type', 'application/json')
                .send({
                  requests: [
                    {
                      image: {
                        content: base64
                      },
                      features: [
                        {
                          type: 'TEXT_DETECTION',
                          maxResults: 10
                        }
                      ]
                    }
                  ]
                }).then((res) => {
                  callback(res.body);
                }, (err) => {
                  callback(err);
                });
}
