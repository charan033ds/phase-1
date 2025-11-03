import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, File, Folder, CheckCircle2, Copy, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FileUploader() {
  const [repoName, setRepoName] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      console.log("Files selected:", files.length);
    }
  };

  const handleUpload = async () => {
    if (!repoName || !selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide a repository name and select files to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    console.log("Upload triggered:", { repoName, commitMessage, filesCount: selectedFiles.length });
    
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      const mockUrl = `https://github.com/username/${repoName}`;
      setRepoUrl(mockUrl);
      toast({
        title: "Upload Successful!",
        description: `Files uploaded to ${repoName}`,
      });
    }, 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(repoUrl);
    toast({
      title: "Copied!",
      description: "Repository URL copied to clipboard",
    });
    console.log("URL copied:", repoUrl);
  };

  const handleReset = () => {
    setRepoName("");
    setCommitMessage("");
    setSelectedFiles(null);
    setUploadSuccess(false);
    setRepoUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-md">
              <Github className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">GitHub File Uploader</CardTitle>
              <CardDescription className="text-sm mt-1">
                Upload files and folders to your GitHub repositories
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!uploadSuccess ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="repo-name" className="text-sm font-medium">
                  Repository Name
                </Label>
                <Input
                  id="repo-name"
                  data-testid="input-repo-name"
                  placeholder="my-awesome-project"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Enter an existing repository name or create a new one
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-input" className="text-sm font-medium">
                  Files
                </Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full justify-start gap-2"
                    data-testid="button-choose-files"
                  >
                    {selectedFiles && selectedFiles.length > 0 ? (
                      <>
                        <File className="w-4 h-4" />
                        {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""} selected
                      </>
                    ) : (
                      <>
                        <Folder className="w-4 h-4" />
                        Choose Files
                      </>
                    )}
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  id="file-input"
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {selectedFiles && selectedFiles.length > 0 && (
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Selected files:</p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {Array.from(selectedFiles).map((file, index) => (
                        <div key={index} className="text-xs font-mono text-foreground flex items-center gap-2">
                          <File className="w-3 h-3" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="commit-message" className="text-sm font-medium">
                  Commit Message
                </Label>
                <Textarea
                  id="commit-message"
                  data-testid="input-commit-message"
                  placeholder="Add project files"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={handleUpload}
                disabled={isUploading || !repoName || !selectedFiles || selectedFiles.length === 0}
                className="w-full gap-2"
                data-testid="button-upload"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload to GitHub
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-md border border-primary/20">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Upload Successful!</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your files have been uploaded to the repository
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Repository URL</Label>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-muted rounded-md border border-border">
                    <p className="text-sm font-mono text-foreground break-all" data-testid="text-repo-url">
                      {repoUrl}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyUrl}
                    data-testid="button-copy-url"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1"
                  data-testid="button-upload-more"
                >
                  Upload More Files
                </Button>
                <Button
                  onClick={() => window.open(repoUrl, "_blank")}
                  className="flex-1 gap-2"
                  data-testid="button-view-repo"
                >
                  <Github className="w-4 h-4" />
                  View Repository
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
