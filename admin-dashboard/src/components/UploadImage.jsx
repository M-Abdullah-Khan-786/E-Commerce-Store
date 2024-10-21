import Dropzone from "react-dropzone";

const UploadImage = () => {
  return (
    <>
      <div className="bg-white border-1 p-5 text-center">
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag n drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </>
  );
};

export default UploadImage;
