'use client';

import React, { useState, useEffect } from 'react';
import { ClipboardIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface R2Object {
  key: string;
  size: number;
  lastModified: string;
}

interface R2Status {
  status: 'success' | 'error';
  message: string;
  bucketName?: string;
  objectCount?: number;
  objects?: R2Object[];
  error?: string;
  code?: string;
  config?: {
    accountId: string;
    accessKeyConfigured: boolean;
    secretKeyConfigured: boolean;
    bucketName?: string;
  };
}

export default function R2StatusPage() {
  const [status, setStatus] = useState<R2Status | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/r2-test');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Failed to fetch R2 status:', error);
      setStatus({
        status: 'error',
        message: 'Failed to fetch R2 status',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testUpload = async () => {
    setUploadLoading(true);
    try {
      const response = await fetch('/api/r2-upload-test');
      const data = await response.json();
      setUploadResult(data);
    } catch (error) {
      console.error('Failed to test R2 upload:', error);
      setUploadResult({
        status: 'error',
        message: 'Failed to test R2 upload',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setUploadLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold text-white mb-8">R2 Storage Status</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connection Status */}
        <div className="bg-white/15 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-white">Connection Status</h2>
            <button 
              onClick={fetchStatus} 
              disabled={isLoading}
              className="flex items-center bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-md transition"
            >
              <ArrowPathIcon className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : status ? (
            <div>
              <div className={`text-lg font-medium mb-4 ${status.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {status.message}
              </div>
              
              {status.status === 'success' ? (
                <>
                  <div className="bg-white/10 rounded-md p-4 mb-4">
                    <h3 className="text-lg font-medium text-white mb-2">Configuration</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-white/80">Bucket Name:</div>
                      <div className="text-white">{status.bucketName}</div>
                      <div className="text-white/80">Account ID:</div>
                      <div className="text-white">{status.config?.accountId}</div>
                      <div className="text-white/80">Access Key:</div>
                      <div className="text-white">{status.config?.accessKeyConfigured ? '✅ Configured' : '❌ Missing'}</div>
                      <div className="text-white/80">Secret Key:</div>
                      <div className="text-white">{status.config?.secretKeyConfigured ? '✅ Configured' : '❌ Missing'}</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-md p-4">
                    <h3 className="text-lg font-medium text-white mb-2">Objects ({status.objectCount || 0})</h3>
                    {status.objects && status.objects.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="border-b border-white/20">
                            <tr>
                              <th className="px-4 py-2 text-white/80">Key</th>
                              <th className="px-4 py-2 text-white/80">Size</th>
                              <th className="px-4 py-2 text-white/80">Last Modified</th>
                            </tr>
                          </thead>
                          <tbody>
                            {status.objects.map((obj, idx) => (
                              <tr key={idx} className="border-b border-white/10">
                                <td className="px-4 py-2 text-white truncate max-w-[200px]">{obj.key}</td>
                                <td className="px-4 py-2 text-white">{formatBytes(obj.size)}</td>
                                <td className="px-4 py-2 text-white">
                                  {new Date(obj.lastModified).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-white/80">No objects found in bucket</p>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-white/10 rounded-md p-4">
                  <h3 className="text-lg font-medium text-white mb-2">Error Details</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-white/80">Error Message:</div>
                    <div className="text-red-400">{status.error}</div>
                    {status.code && (
                      <>
                        <div className="text-white/80">Error Code:</div>
                        <div className="text-red-400">{status.code}</div>
                      </>
                    )}
                  </div>
                  
                  {status.config && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-white mb-2">Configuration</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-white/80">Bucket Name:</div>
                        <div className="text-white">{status.config.bucketName}</div>
                        <div className="text-white/80">Account ID:</div>
                        <div className="text-white">{status.config.accountId}</div>
                        <div className="text-white/80">Access Key:</div>
                        <div className="text-white">{status.config.accessKeyConfigured ? '✅ Configured' : '❌ Missing'}</div>
                        <div className="text-white/80">Secret Key:</div>
                        <div className="text-white">{status.config.secretKeyConfigured ? '✅ Configured' : '❌ Missing'}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-white/80">Loading R2 status...</p>
          )}
        </div>
        
        {/* Upload Test */}
        <div className="bg-white/15 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-white">Upload Test</h2>
            <button 
              onClick={testUpload} 
              disabled={uploadLoading}
              className="flex items-center bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-md transition"
            >
              <ArrowPathIcon className={`w-5 h-5 mr-2 ${uploadLoading ? 'animate-spin' : ''}`} />
              Test Upload
            </button>
          </div>
          
          {uploadLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : uploadResult ? (
            <div>
              <div className={`text-lg font-medium mb-4 ${uploadResult.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {uploadResult.message}
              </div>
              
              {uploadResult.status === 'success' ? (
                <div className="bg-white/10 rounded-md p-4">
                  <h3 className="text-lg font-medium text-white mb-2">Upload Details</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-white/80">Object Key:</div>
                    <div className="text-white">{uploadResult.key}</div>
                    <div className="text-white/80">Timestamp:</div>
                    <div className="text-white">{new Date(uploadResult.timestamp).toLocaleString()}</div>
                    <div className="text-white/80">Presigned URL:</div>
                    <div className="flex items-center">
                      <a 
                        href={uploadResult.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:text-blue-300 truncate max-w-[200px]"
                      >
                        {uploadResult.url.substring(0, 30)}...
                      </a>
                      <button 
                        onClick={() => copyToClipboard(uploadResult.url)}
                        className="ml-2 text-white/80 hover:text-white"
                      >
                        <ClipboardIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-white mb-2">Test Image</h3>
                    <div className="p-4 bg-white/5 rounded-md flex justify-center">
                      <img 
                        src={uploadResult.url} 
                        alt="Test upload" 
                        className="max-w-full h-auto border-2 border-white/20 rounded"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/10 rounded-md p-4">
                  <h3 className="text-lg font-medium text-white mb-2">Error Details</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-white/80">Error Message:</div>
                    <div className="text-red-400">{uploadResult.error}</div>
                    {uploadResult.code && (
                      <>
                        <div className="text-white/80">Error Code:</div>
                        <div className="text-red-400">{uploadResult.code}</div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/10 rounded-md p-4">
              <p className="text-white/80">Click the "Test Upload" button to verify R2 upload functionality.</p>
              <p className="text-white/80 mt-2">This will upload a small test image to your R2 bucket and generate a presigned URL to verify accessibility.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 bg-white/15 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">R2 Integration Guidelines</h2>
        <div className="text-white/80 space-y-3">
          <p>Your Instagram Downloader application is now configured to use Cloudflare R2 for media storage and delivery. Here are some important points:</p>
          
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong className="text-white">Media Storage:</strong> All downloaded Instagram media will be stored in your R2 bucket.</li>
            <li><strong className="text-white">Presigned URLs:</strong> Media is served via secure presigned URLs that expire after a set period.</li>
            <li><strong className="text-white">Fallback:</strong> If R2 storage fails, the app will fall back to direct Instagram URLs.</li>
            <li><strong className="text-white">Bucket Organization:</strong> Media is organized by post ID and timestamp.</li>
            <li><strong className="text-white">Edge Performance:</strong> Content is served from Cloudflare's global edge network for faster downloads.</li>
          </ol>
          
          <p className="mt-4"><strong className="text-white">Best Practices:</strong></p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Consider implementing object lifecycle policies in your R2 bucket to automatically delete old media.</li>
            <li>Monitor your R2 storage usage and costs regularly.</li>
            <li>Adjust presigned URL expiration times based on your security requirements.</li>
            <li>Set up proper CORS configuration if you encounter cross-origin issues.</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 