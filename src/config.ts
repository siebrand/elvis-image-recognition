import ClarifaiAPI = require('clarifai');

export class Config {
  /**
   * Enable or disable HTTP.
   */
  static httpEnabled: boolean = process.env.IR_HTTP_ENABLED === 'true' || true;

  /**
   * HTTP Port where the app runs.
   */
  static httpPort: string = process.env.IR_HTTP_PORT || '9090';

  /**
   * Enable or disable HTTPS. When enabled, all HTTP traffic is redirected to HTTPS.
   */
  static httpsEnabled: boolean = process.env.IR_HTTPS_ENABLED === 'true' || false;

  /**
   * HTTPS Port where the app runs.
   */
  static httpsPort: string = process.env.IR_HTTPS_PORT || '9443';

  /**
   * SSL private key.
   */
  static httpsKeyFile: string = process.env.IR_HTTPS_KEY_FILE || './https/server.key';

  /**
   * SSL certificate.
   */
  static httpsCertFile: string = process.env.IR_HTTPS_CERT_FILE || './https/server.crt';

  /**
   * Temporary directory used for downloading images.
   */
  static tempDir: string = process.env.IR_TEMP_DIR || './temp';

  /**
   * Elvis server url.
   */
  static elvisUrl: string = process.env.IR_ELVIS_URL || 'http://localhost:8080';

  /**
   * Elvis username. 
   * 
   * Permission configuration:
   * - This user should be licensed as an API user.
   * - Ensure that the user can access the preview of all images imported in Elvis.
   */
  static elvisUsername: string = process.env.IR_ELVIS_USER || 'admin';

  /**
   * Elvis password.
   */
  static elvisPassword: string = process.env.IR_ELVIS_PASSWORD || 'changemenow';


  /**
   * Recognize images right after they are imported in Elvis.
   * 
   * This depends on webhooks, make sure to also configure the elvisToken correctly when this setting is enabled.
   */
  static recognizeOnImport: boolean = process.env.IR_RECOGNIZE_ON_IMPORT === 'true' || true;

  /**
   * Enable or disable the REST API.
   * 
   * Web client plugins like the Auto Tag Images plugin depend on this API to be enabled.
   * 
   * SECURITY NOTE: This API has no build in authentication, check the readme for API security instructions 
   */
  static restAPIEnabled: boolean = process.env.IR_REST_API_ENABLED === 'true' || false;

  /**
   * Elvis webhook token. Create a webhook that listens for "asset_update_metadata" events and that returns the "assetDomain" metadata field.
   * 
   * More info on creating a webhook: https://helpcenter.woodwing.com/hc/en-us/articles/115001884346
   */
  static elvisToken: string = process.env.IR_ELVIS_TOKEN || 'my-webhook-token';

  /**
   * Elvis metadata field where the unique tags from all services are stored.
   * 
   * Default value is "tagsFromAI" which holds all tags generated by image recognition services. 
   * Note that this metadata field was introduced with Elvis 5.26
   */
  static elvisTagsField: string = process.env.IR_ELVIS_TAGS_FIELD || 'tagsFromAI';

  /**
   * Elvis metadata field that holds a timestamp of the last AI metadata update.
   *
   * This can be useful to determine which files need to be processed or re-processed after a certain period (new services, better AI models)
   */
  static aiMetadataModifiedField: string = process.env.IR_ELVIS_AI_METADATA_MODIFIED_FIELD || 'cf_aiMetadataModified'

  /**
   * Enable or disable Clarifai image recognition.
   */
  static clarifaiEnabled: boolean = process.env.IR_CLARIFAI_ENABLED === 'true' || true;

  /**
   * Clarifai API key.
   * 
   * Can be obtained by creating a Clarifai account: https://www.clarifai.com/
   */
  static clarifaiAPIKey: string = process.env.IR_CLARIFAI_API_KEY || 'my-clarifai-api-key';

  /**
   * Elvis metadata field where Clarifai tags are stored, set to null to skip saving tags in a specific Clarifai field.
   */
  static clarifaiTagsField: string = process.env.IR_CLARIFAI_TAGS_FIELD || 'cf_tagsClarifai';

  /**
   * Mapping between a folder in Elvis and one or multiple Clarifai models.
   * 
   * When recognizeOnImport=true, this mapping is used to tag images using on import one or multiple models.
   * More info on Clarifai models: https://clarifai.com/models/
   * 
   * Possible model values:
   * - ClarifaiAPI.GENERAL_MODEL
   * - ClarifaiAPI.FOOD_MODEL
   * - ClarifaiAPI.TRAVEL_MODEL
   * - ClarifaiAPI.WEDDING_MODEL
   * - ClarifaiAPI.APPAREL_MODEL
   * - 'e466caa0619f444ab97497640cefc4dc' (Celebrity model)
   */
  static clarifaiFolderToModelMapping: any[] = [
    {
      folder: '/Demo Zone/Images/Food',
      models: [ClarifaiAPI.FOOD_MODEL]
    },
    {
      folder: '/Demo Zone/Images/Travel',
      models: [ClarifaiAPI.GENERAL_MODEL, ClarifaiAPI.TRAVEL_MODEL]
    },
    {
      folder: '/Demo Zone/Images/Wedding',
      models: [ClarifaiAPI.GENERAL_MODEL, ClarifaiAPI.WEDDING_MODEL]
    },
    {
      folder: '/Demo Zone/Images/Apparel',
      models: [ClarifaiAPI.GENERAL_MODEL, ClarifaiAPI.APPAREL_MODEL]
    },
    {
      folder: '/Demo Zone/Images/Celebrity',
      models: [ClarifaiAPI.GENERAL_MODEL, 'e466caa0619f444ab97497640cefc4dc']
    }
  ];

  /**
   * Enable or disable Google image recognition.
   */
  static googleEnabled: boolean = process.env.IR_GOOGLE_ENABLED === 'true' || true;

  /**
   * Full path to the Google Service account keyfile (JSON).  
   *
   * Can be obtained by creating a Google Cloud account: https://cloud.google.com/vision/
   * 
   * Steps when starting from scratch with Google Vision:
   * - Create a new project.
   * - Enable the Cloud Vision API (API Manager -> Library -> Vision API).
   * - Create a service account key (API Manager -> Credentials -> Create Credentials - Service account key).
   * - Specify the full path to the JSON keyfile in this setting.
   */
  static googleKeyFilename: string = process.env.IR_GOOGLE_KEY_FILENAME || '/Users/username/keyfile.json';

  /**
   * Elvis metadata field where Google tags are stored, set to null to skip saving tags in a specific Google field.
   */
  static googleTagsField: string = process.env.IR_GOOGLE_TAGS_FIELD || 'cf_tagsGoogle';

  /**
   * Enable or disable AWS image recognition.
   */
  static awsEnabled: boolean = process.env.IR_AWS_ENABLED === 'true' || true;

  /**
   * AWS access key
   * 
   * Can be obtained by creating an AWS account: https://aws.amazon.com/
   */
  static awsAccessKeyId: string = process.env.IR_AWS_ACCESS_KEY || 'my-aws-access-key';

  /**
   * AWS secret access key
   *
   * Can be obtained by creating an AWS account: https://aws.amazon.com/
   */
  static awsSecretAccessKey: string = process.env.IR_AWS_SECRET_ACCESS_KEY || 'my-aws-secret-access-key';

  /**
   * Elvis metadata field where AWS tags are stored, set to null to skip saving tags in a specific AWS field.
   */
  static awsRegion: string = process.env.IR_AWS_REGION || 'eu-west-1';

  /**
   * Elvis metadata field where AWS tags are stored, set to null to skip saving tags in a specific AWS field.
   */
  static awsTagsField: string = process.env.IR_AWS_TAGS_FIELD || 'cf_tagsAWS';

  /**
   * Comma separated list of languages in which the generated tags are translated. Default value is empty 
   * which means translation of tags is disabled
   * 
   * Google Translate is used as translation service.
   * Example values for Dutch, Portugese and Russian: 'nl,pt,ru'
   * 
   * - Requires googleKeyFilename setting to be configured.
   * - Enable the Translate API on your Google Cloud account
   * - Languages to choose from: https://cloud.google.com/translate/docs/languages
   */
  static languages: string = process.env.IR_LANGUAGES || '';

  /**
   * Language to translate from. Default value is 'en' - English
   * 
   * Specify the language in which the tags are provided from your AI service provider.
   */
  static sourceLanguage: string = process.env.IR_SOURCE_LANGUAGE || 'en';

  /**
   * Comma separated list of tag field names to store the translated tags. Default value is the  
   * tag field name defined for Config.elvisTagsField.
   * 
   * The order of the field names need to be identical to the languages field, for example:
   * 'cf_tagsNl,cf_tagsPt,cf_tagsRu'
   */
  static languageTagFields: string = process.env.IR_LANGUAGE_TAG_FIELDS || Config.elvisTagsField;

}