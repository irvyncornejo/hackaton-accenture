from services import Image
from services import Process

def lambda_handler(event, context):
 
    fileName=event['fileName']
    bucket=event['bucket']
    
    services = Process()
    image = Image(fileName, bucket)
    labels_image =  services.load(image.get_labels())
    
    if labels_image['vehicle']:
        text_image = image.get_text()
        text = services.text_validate(text_image)
        print({"Labels": labels_image['data'],
            "Text": text})
        return {
            "Labels": labels_image['data'],
            "Text": text, 
            "Parents": labels_image['parents']
        }
    else:
        print({"Labels": labels_image['data'],
            "Text": None})
        return {
            "Labels": labels_image['data'],
            "Parents": labels_image['parents'],
            "Text": None
        }